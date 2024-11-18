/* archivo para registrar tareas a la base de datos mediante graphql de apollo client */
import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask(
    $name_item: String!,
    $description_item: String!,
    $state_item: state_item!,
    $priority_item: priority_item!,
    $id_todolist: Int!
  ) {
    insert_item(objects: {
      name_item: $name_item,
      description_item: $description_item,
      state_item: $state_item,
      priority_item: $priority_item,
      id_todolist: $id_todolist
    }) {
      returning {
        id_item
        name_item
        description_item
        state_item
        priority_item
      }
    }
  }
`;
