/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getProductos = /* GraphQL */ `
  query GetProductos($id: ID!) {
    getProductos(id: $id) {
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
export const listProductos = /* GraphQL */ `
  query ListProductos(
    $filter: ModelProductosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        id
        createdAt
        updatedAt
        productosListId
      }
      nextToken
    }
  }
`;
export const getList = /* GraphQL */ `
  query GetList($id: ID!) {
    getList(id: $id) {
      listName
      id
      createdAt
      updatedAt
    }
  }
`;
export const listLists = /* GraphQL */ `
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        listName
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listsByDate = /* GraphQL */ `
  query ListsByDate(
    $type: POSTTYPE!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
