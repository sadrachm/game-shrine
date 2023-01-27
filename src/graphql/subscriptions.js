/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateGames = /* GraphQL */ `
  subscription OnCreateGames($filter: ModelSubscriptionGamesFilterInput) {
    onCreateGames(filter: $filter) {
      title
      date
      src
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGames = /* GraphQL */ `
  subscription OnUpdateGames($filter: ModelSubscriptionGamesFilterInput) {
    onUpdateGames(filter: $filter) {
      title
      date
      src
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGames = /* GraphQL */ `
  subscription OnDeleteGames($filter: ModelSubscriptionGamesFilterInput) {
    onDeleteGames(filter: $filter) {
      title
      date
      src
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProductos = /* GraphQL */ `
  subscription OnCreateProductos(
    $filter: ModelSubscriptionProductosFilterInput
  ) {
    onCreateProductos(filter: $filter) {
      name
      list {
        listName
        list
        id
        createdAt
        updatedAt
      }
      order
      id
      createdAt
      updatedAt
      productosListId
    }
  }
`;
export const onUpdateProductos = /* GraphQL */ `
  subscription OnUpdateProductos(
    $filter: ModelSubscriptionProductosFilterInput
  ) {
    onUpdateProductos(filter: $filter) {
      name
      list {
        listName
        list
        id
        createdAt
        updatedAt
      }
      order
      id
      createdAt
      updatedAt
      productosListId
    }
  }
`;
export const onDeleteProductos = /* GraphQL */ `
  subscription OnDeleteProductos(
    $filter: ModelSubscriptionProductosFilterInput
  ) {
    onDeleteProductos(filter: $filter) {
      name
      list {
        listName
        list
        id
        createdAt
        updatedAt
      }
      order
      id
      createdAt
      updatedAt
      productosListId
    }
  }
`;
export const onCreateList = /* GraphQL */ `
  subscription OnCreateList($filter: ModelSubscriptionListFilterInput) {
    onCreateList(filter: $filter) {
      listName
      list
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList($filter: ModelSubscriptionListFilterInput) {
    onUpdateList(filter: $filter) {
      listName
      list
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList($filter: ModelSubscriptionListFilterInput) {
    onDeleteList(filter: $filter) {
      listName
      list
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMeasurements = /* GraphQL */ `
  subscription OnCreateMeasurements(
    $filter: ModelSubscriptionMeasurementsFilterInput
  ) {
    onCreateMeasurements(filter: $filter) {
      fitPersonMeasurementsId
      createdAt
      chest
      waist
      hip
      thigh
      weight
      arm
      id
      updatedAt
    }
  }
`;
export const onUpdateMeasurements = /* GraphQL */ `
  subscription OnUpdateMeasurements(
    $filter: ModelSubscriptionMeasurementsFilterInput
  ) {
    onUpdateMeasurements(filter: $filter) {
      fitPersonMeasurementsId
      createdAt
      chest
      waist
      hip
      thigh
      weight
      arm
      id
      updatedAt
    }
  }
`;
export const onDeleteMeasurements = /* GraphQL */ `
  subscription OnDeleteMeasurements(
    $filter: ModelSubscriptionMeasurementsFilterInput
  ) {
    onDeleteMeasurements(filter: $filter) {
      fitPersonMeasurementsId
      createdAt
      chest
      waist
      hip
      thigh
      weight
      arm
      id
      updatedAt
    }
  }
`;
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onCreateExercise(filter: $filter) {
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
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onUpdateExercise(filter: $filter) {
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
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise($filter: ModelSubscriptionExerciseFilterInput) {
    onDeleteExercise(filter: $filter) {
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
export const onCreateDay = /* GraphQL */ `
  subscription OnCreateDay($filter: ModelSubscriptionDayFilterInput) {
    onCreateDay(filter: $filter) {
      exercises {
        nextToken
      }
      type
      createdAt
      id
      updatedAt
      fitPersonDaysId
    }
  }
`;
export const onUpdateDay = /* GraphQL */ `
  subscription OnUpdateDay($filter: ModelSubscriptionDayFilterInput) {
    onUpdateDay(filter: $filter) {
      exercises {
        nextToken
      }
      type
      createdAt
      id
      updatedAt
      fitPersonDaysId
    }
  }
`;
export const onDeleteDay = /* GraphQL */ `
  subscription OnDeleteDay($filter: ModelSubscriptionDayFilterInput) {
    onDeleteDay(filter: $filter) {
      exercises {
        nextToken
      }
      type
      createdAt
      id
      updatedAt
      fitPersonDaysId
    }
  }
`;
export const onCreateFitPerson = /* GraphQL */ `
  subscription OnCreateFitPerson(
    $filter: ModelSubscriptionFitPersonFilterInput
  ) {
    onCreateFitPerson(filter: $filter) {
      name
      days {
        nextToken
      }
      measurements {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFitPerson = /* GraphQL */ `
  subscription OnUpdateFitPerson(
    $filter: ModelSubscriptionFitPersonFilterInput
  ) {
    onUpdateFitPerson(filter: $filter) {
      name
      days {
        nextToken
      }
      measurements {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFitPerson = /* GraphQL */ `
  subscription OnDeleteFitPerson(
    $filter: ModelSubscriptionFitPersonFilterInput
  ) {
    onDeleteFitPerson(filter: $filter) {
      name
      days {
        nextToken
      }
      measurements {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
