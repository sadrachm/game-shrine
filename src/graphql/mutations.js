/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      title
      type
      homeImg
      mainImg
      lastImg
      trailer
      content
      homeDes
      createdAt
      published
      id
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      title
      type
      homeImg
      mainImg
      lastImg
      trailer
      content
      homeDes
      createdAt
      published
      id
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      title
      type
      homeImg
      mainImg
      lastImg
      trailer
      content
      homeDes
      createdAt
      published
      id
      updatedAt
    }
  }
`;
export const createProductos = /* GraphQL */ `
  mutation CreateProductos(
    $input: CreateProductosInput!
    $condition: ModelProductosConditionInput
  ) {
    createProductos(input: $input, condition: $condition) {
      name
      list {
        listName
        id
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
      productosListId
    }
  }
`;
export const updateProductos = /* GraphQL */ `
  mutation UpdateProductos(
    $input: UpdateProductosInput!
    $condition: ModelProductosConditionInput
  ) {
    updateProductos(input: $input, condition: $condition) {
      name
      list {
        listName
        id
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
      productosListId
    }
  }
`;
export const deleteProductos = /* GraphQL */ `
  mutation DeleteProductos(
    $input: DeleteProductosInput!
    $condition: ModelProductosConditionInput
  ) {
    deleteProductos(input: $input, condition: $condition) {
      name
      list {
        listName
        id
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
      productosListId
    }
  }
`;
export const createList = /* GraphQL */ `
  mutation CreateList(
    $input: CreateListInput!
    $condition: ModelListConditionInput
  ) {
    createList(input: $input, condition: $condition) {
      listName
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateList = /* GraphQL */ `
  mutation UpdateList(
    $input: UpdateListInput!
    $condition: ModelListConditionInput
  ) {
    updateList(input: $input, condition: $condition) {
      listName
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteList = /* GraphQL */ `
  mutation DeleteList(
    $input: DeleteListInput!
    $condition: ModelListConditionInput
  ) {
    deleteList(input: $input, condition: $condition) {
      listName
      id
      createdAt
      updatedAt
    }
  }
`;
