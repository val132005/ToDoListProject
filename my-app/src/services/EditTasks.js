/* archivo para editar tareas a la base de datos mediante graphql de apollo client */
import { gql } from "@apollo/client";

export const EDIT_TASK = gql`
  mutation EditTask($id_item: ID!, $name_item: String!, $description_item: String!, $state_item: String!, $priority_item: String!) {
    updateItem(
      where: { id_item: $id_item }
      data: {
        name_item: $name_item
        description_item: $description_item
        state_item: $state_item
        priority_item: $priority_item
      }
    ) {
      id_item
      name_item
      description_item
      state_item
      priority_item
    }
  }
`;


