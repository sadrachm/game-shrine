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
      images
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
        images
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
export const getGames = /* GraphQL */ `
  query GetGames($id: ID!) {
    getGames(id: $id) {
      title
      date
      src
      id
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGamesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        title
        date
        src
        id
        createdAt
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
export const getExercise = /* GraphQL */ `
  query GetExercise($id: ID!) {
    getExercise(id: $id) {
      act
      rep
      weight
      time
      id
      createdAt
      updatedAt
      dayExercisesId
    }
  }
`;
export const listExercises = /* GraphQL */ `
  query ListExercises(
    $filter: ModelExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        act
        rep
        weight
        time
        id
        createdAt
        updatedAt
        dayExercisesId
      }
      nextToken
    }
  }
`;
export const getDay = /* GraphQL */ `
  query GetDay($id: ID!) {
    getDay(id: $id) {
      exercises {
        nextToken
      }
      type
      id
      createdAt
      updatedAt
      fitPersonDaysId
    }
  }
`;
export const listDays = /* GraphQL */ `
  query ListDays(
    $filter: ModelDayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDays(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        createdAt
        updatedAt
        fitPersonDaysId
      }
      nextToken
    }
  }
`;
export const getFitPerson = /* GraphQL */ `
  query GetFitPerson($id: ID!) {
    getFitPerson(id: $id) {
      name
      days {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const listFitPeople = /* GraphQL */ `
  query ListFitPeople(
    $filter: ModelFitPersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFitPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
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
        images
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
