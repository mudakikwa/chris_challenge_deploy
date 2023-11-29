import React, { useContext, useEffect } from "react";
import styles from "./userInfo.module.scss";
import { CircularProgress, Stack, Alert, Container } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphQL/query_GET_USERS";
import { SAVE_EDIT_CONTEXT } from "../App";
import InfoTable from "./table";

export default function UserInfo() {
  const { loading, data, error, refetch } = useQuery(GET_USERS, {
    fetchPolicy: "no-cache",
  });

  const { setEditModeOn, setFetchDocumentedData } =
    useContext(SAVE_EDIT_CONTEXT);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refresh = () => {
    refetch();
  };

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleEditData = () => {
    const sectorIds = [];
    data?.user_sectors?.forEach((sector) => {
      sectorIds.push(sector.sector_id);
    });
    setFetchDocumentedData({
      name: data?.user[0]?.name,
      sectors: sectorIds,
      user_id: data?.user[0]?.id,
    });
    setEditModeOn(true);
  };

  if (loading)
    return (
      <Container
        sx={{
          width: "100vw",
          display: "grid",
          placeItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress color="warning" />
      </Container>
    );

  return (
    <div className={styles.userInfo}>
      <h1 className="h3">Info Records</h1>
      {error && (
        <Stack sx={{ width: "100%" }}>
          <Alert variant="outlined" severity="error">
            {error.message}
          </Alert>
        </Stack>
      )}
      <div className="input">
        <div className="input_wrapper">
          <div className="input_label">Name:</div>
          <div className="input_field">
            <Stack
              direction="row"
              sx={{
                width: "100%",
                background: "rgba(4, 140, 212, 0.15)",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              {data?.user[0]?.name}
            </Stack>
          </div>
        </div>
      </div>
      <div className="input">
        <div className="input_wrapper sectors_box">
          <div className="input_label">Sectors:</div>
          <div className="sectors">
            <Stack
              direction="row"
              sx={{
                width: "100%",
                background: "transparent",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                margin: 0,
              }}
            >
              <InfoTable data={data?.user_sectors} />
            </Stack>
          </div>
        </div>
      </div>
      <div className="actions">
        <button type="button" className="editBtn btn" onClick={handleEditData}>
          Edit
        </button>
      </div>
    </div>
  );
}
