import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query all_sectors {
    user {
      id
      name
    }
    user_sectors {
      id
      user_id
      sector_id
      sector {
        value
        id
        category
      }
    }
  }
`;
