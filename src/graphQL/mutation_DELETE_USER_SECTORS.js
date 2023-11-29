import { gql } from "@apollo/client";

export const DELETE_PREVIOUS_USER_SECTORS = gql`
  mutation delete_sectors($id: Int!) {
    delete_user_sectors(where: { user_id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
