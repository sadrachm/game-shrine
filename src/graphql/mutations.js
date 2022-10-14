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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createGames = /* GraphQL */ `
  mutation CreateGames(
    $input: CreateGamesInput!
    $condition: ModelGamesConditionInput
  ) {
    createGames(input: $input, condition: $condition) {
      title
      date
      src
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateGames = /* GraphQL */ `
  mutation UpdateGames(
    $input: UpdateGamesInput!
    $condition: ModelGamesConditionInput
  ) {
    updateGames(input: $input, condition: $condition) {
      title
      date
      src
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteGames = /* GraphQL */ `
  mutation DeleteGames(
    $input: DeleteGamesInput!
    $condition: ModelGamesConditionInput
  ) {
    deleteGames(input: $input, condition: $condition) {
      title
      date
      src
      id
      createdAt
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
export const createExercise = /* GraphQL */ `
  mutation CreateExercise(
    $input: CreateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    createExercise(input: $input, condition: $condition) {
      act
      type
      rep
      weight
      time
      createdAt
      id
      updatedAt
      dayExercisesId
    }
  }
`;
export const updateExercise = /* GraphQL */ `
  mutation UpdateExercise(
    $input: UpdateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    updateExercise(input: $input, condition: $condition) {
      act
      type
      rep
      weight
      time
      createdAt
      id
      updatedAt
      dayExercisesId
    }
  }
`;
export const deleteExercise = /* GraphQL */ `
  mutation DeleteExercise(
    $input: DeleteExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    deleteExercise(input: $input, condition: $condition) {
      act
      type
      rep
      weight
      time
      createdAt
      id
      updatedAt
      dayExercisesId
    }
  }
`;
export const createDay = /* GraphQL */ `
  mutation CreateDay(
    $input: CreateDayInput!
    $condition: ModelDayConditionInput
  ) {
    createDay(input: $input, condition: $condition) {
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
export const updateDay = /* GraphQL */ `
  mutation UpdateDay(
    $input: UpdateDayInput!
    $condition: ModelDayConditionInput
  ) {
    updateDay(input: $input, condition: $condition) {
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
export const deleteDay = /* GraphQL */ `
  mutation DeleteDay(
    $input: DeleteDayInput!
    $condition: ModelDayConditionInput
  ) {
    deleteDay(input: $input, condition: $condition) {
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
export const createFitPerson = /* GraphQL */ `
  mutation CreateFitPerson(
    $input: CreateFitPersonInput!
    $condition: ModelFitPersonConditionInput
  ) {
    createFitPerson(input: $input, condition: $condition) {
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
export const updateFitPerson = /* GraphQL */ `
  mutation UpdateFitPerson(
    $input: UpdateFitPersonInput!
    $condition: ModelFitPersonConditionInput
  ) {
    updateFitPerson(input: $input, condition: $condition) {
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
export const deleteFitPerson = /* GraphQL */ `
  mutation DeleteFitPerson(
    $input: DeleteFitPersonInput!
    $condition: ModelFitPersonConditionInput
  ) {
    deleteFitPerson(input: $input, condition: $condition) {
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
