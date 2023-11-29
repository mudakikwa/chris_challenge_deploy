import React, { useContext } from "react";
import styles from "./userInfoEdit.module.scss";
import { useFormik } from "formik";
import { validationSchema } from "./uservalidation";
import {
  Autocomplete,
  Chip,
  CircularProgress,
  TextField,
  Stack,
  Alert,
} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_SECTORS } from "../graphQL/query_GET_ALL_SECTORS";
import { SAVE_EDIT_CONTEXT } from "../App";
import { UPDATE_INSERT } from "../graphQL/mutation_UPDATE_INSERT_USER_SECTORS";
import { DELETE_PREVIOUS_USER_SECTORS } from "../graphQL/mutation_DELETE_USER_SECTORS";

export default function EditUserInfo() {
  //queries
  const { loading, data, error } = useQuery(GET_ALL_SECTORS);
  const [submitData, { loading: loadingData, error: errorData }] =
    useMutation(UPDATE_INSERT);
  const [emptyPreviousData, { loading: loadingEmpty, error: errorEmpty }] =
    useMutation(DELETE_PREVIOUS_USER_SECTORS);

  //contexts
  const { setEditModeOn, fetchDocumentedData } = useContext(SAVE_EDIT_CONTEXT);
  const { name, sectors, user_id } = fetchDocumentedData;

  const initialValues = {
    name,
    sectors,
    agreeToTerms: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await emptyPreviousData({
        variables: {
          id: user_id,
        },
      });
      values.sectors.forEach(async (sector_id) => {
        await submitData({
          variables: {
            user_id,
            name: values.name,
            sector_id,
          },
        });
      });
      setEditModeOn(false);
    },
  });

  const handleCancelEdit = () => {
    setEditModeOn(false);
  };

  return (
    <form
      className={
        formik.errors.name &&
        formik.touched.name &&
        formik.touched.sectors &&
        formik.touched.sectors &&
        formik.errors.agreeToTerms &&
        formik.touched.agreeToTerms
          ? `${styles.userInfo} ${styles.userInfoError}`
          : styles.userInfo
      }
      onSubmit={formik.handleSubmit}
    >
      <h1 className="h3">Personal information</h1>
      {error && (
        <Stack sx={{ width: "100%" }}>
          <Alert variant="outlined" severity="error">
            {error.message}
          </Alert>
        </Stack>
      )}
      {errorData && errorEmpty && (
        <Stack sx={{ width: "100%" }}>
          <Alert variant="outlined" severity="error">
            {errorEmpty ? errorEmpty.message : null}
            {errorData ? errorData.message : null}
          </Alert>
        </Stack>
      )}
      <div className="input">
        <div className="input_wrapper">
          <label htmlFor="name" className="input_label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your Name"
            value={formik.values.name}
            className="input_field"
            onChange={formik.handleChange}
          />
        </div>
        {formik.errors.name && formik.touched.name && (
          <small name="name" className="input_error">
            {formik.errors.name}
          </small>
        )}
      </div>
      <div className="input">
        <div className="input_wrapper">
          <label htmlFor="sectors" className="input_label">
            Sectors:
          </label>
          {loading && <CircularProgress color="warning" />}
          {!loading && !error && (
            <Autocomplete
              multiple
              id="tags-filled"
              name="sectors"
              sx={{
                background: "#F2F5FF",
                flexGrow: 1,
                borderRadius: "7px",
                height: "fit-content",
              }}
              options={data.sectors}
              value={formik.values.sectors.map((sectorId) => {
                return (
                  data.sectors.find((option) => option.id === sectorId) || null
                );
              })}
              getOptionLabel={(option) => option.value}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, newValue) => {
                const sectorIds = newValue.map((option) => option.id);
                formik.setFieldValue("sectors", sectorIds);
              }}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    color="primary"
                    variant="filled"
                    sx={{
                      color: "#ffffff",
                      background: "#000000",
                      backdropFilter: "blur(34px)",
                      borderRadius: "5px",
                    }}
                    label={option.value}
                    {...getTagProps({ index })}
                    key={index}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Add a Sector (Max is 5 sectors)"
                />
              )}
            />
          )}
        </div>
        {formik.errors.sectors && formik.touched.sectors && (
          <small name="sectors" className="input_error">
            {formik.errors.sectors}
          </small>
        )}
      </div>
      <div className="input">
        <div className="input_wrapper check_input">
          <input
            type="checkbox"
            name="agreeToTerms"
            id="agreeToTerms"
            onChange={formik.handleChange}
            checked={formik.values.agreeToTerms}
          />
          <label htmlFor="agreeToTerms" className="input_label label_right">
            Agree to terms
          </label>
        </div>
        {formik.errors.agreeToTerms && formik.touched.agreeToTerms && (
          <small name="agreeToTerms" className="input_error">
            {formik.errors.agreeToTerms}
          </small>
        )}
      </div>
      <div className="actions">
        {!loadingEmpty && !loadingData && (
          <button
            type="submit"
            className="editBtn btn"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        )}
        {!loadingEmpty && !loadingData && (
          <button type="submit" className="saveBtn btn">
            Save
          </button>
        )}
        {(loadingEmpty || loadingData) && (
          <div className="loading_box">
            <CircularProgress color="warning" />
          </div>
        )}
      </div>
    </form>
  );
}
