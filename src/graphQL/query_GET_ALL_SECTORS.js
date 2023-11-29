import { gql } from "@apollo/client";

export const GET_ALL_SECTORS = gql`
  query getAllSectors {
    sectors {
      id
      value
      category
    }
  }
`;
