import { gql } from "@apollo/client";

export const UPDATE_INSERT = gql`
  mutation user_sectors($user_id: Int!, $name: String!, $sector_id: Int!) {
    update_user(
      where: { id: { _eq: $user_id } }
      _set: { name: $name, agree_to_terms: true }
    ) {
      returning {
        id
      }
    }
    insert_user_sectors(
      objects: { user_id: $user_id, sector_id: $sector_id }
      on_conflict: {
        constraint: user_sectors_id_key
        update_columns: sector_id
      }
    ) {
      returning {
        id
      }
    }
  }
`;
