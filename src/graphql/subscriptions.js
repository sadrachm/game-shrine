/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote {
    onCreateNote {
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
  subscription OnUpdateNote {
    onUpdateNote {
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
  subscription OnDeleteNote {
    onDeleteNote {
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
  subscription OnCreatePost {
    onCreatePost {
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
  subscription OnUpdatePost {
    onUpdatePost {
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
  subscription OnDeletePost {
    onDeletePost {
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
  subscription OnCreateGames {
    onCreateGames {
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
  subscription OnUpdateGames {
    onUpdateGames {
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
  subscription OnDeleteGames {
    onDeleteGames {
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
  subscription OnCreateProductos {
    onCreateProductos {
      name
      list {
        listName
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
  subscription OnUpdateProductos {
    onUpdateProductos {
      name
      list {
        listName
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
  subscription OnDeleteProductos {
    onDeleteProductos {
      name
      list {
        listName
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
export const onCreateProductOrder = /* GraphQL */ `
  subscription OnCreateProductOrder {
    onCreateProductOrder {
      store
      list
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProductOrder = /* GraphQL */ `
  subscription OnUpdateProductOrder {
    onUpdateProductOrder {
      store
      list
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProductOrder = /* GraphQL */ `
  subscription OnDeleteProductOrder {
    onDeleteProductOrder {
      store
      list
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateList = /* GraphQL */ `
  subscription OnCreateList {
    onCreateList {
      listName
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList {
    onUpdateList {
      listName
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList {
    onDeleteList {
      listName
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMeasurements = /* GraphQL */ `
  subscription OnCreateMeasurements {
    onCreateMeasurements {
      chest
      waist
      hip
      thigh
      weight
      arm
      id
      createdAt
      updatedAt
      fitPersonMeasurementsId
    }
  }
`;
export const onUpdateMeasurements = /* GraphQL */ `
  subscription OnUpdateMeasurements {
    onUpdateMeasurements {
      chest
      waist
      hip
      thigh
      weight
      arm
      id
      createdAt
      updatedAt
      fitPersonMeasurementsId
    }
  }
`;
export const onDeleteMeasurements = /* GraphQL */ `
  subscription OnDeleteMeasurements {
    onDeleteMeasurements {
      chest
      waist
      hip
      thigh
      weight
      arm
      id
      createdAt
      updatedAt
      fitPersonMeasurementsId
    }
  }
`;
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise {
    onCreateExercise {
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
  subscription OnUpdateExercise {
    onUpdateExercise {
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
  subscription OnDeleteExercise {
    onDeleteExercise {
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
  subscription OnCreateDay {
    onCreateDay {
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
  subscription OnUpdateDay {
    onUpdateDay {
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
  subscription OnDeleteDay {
    onDeleteDay {
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
  subscription OnCreateFitPerson {
    onCreateFitPerson {
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
  subscription OnUpdateFitPerson {
    onUpdateFitPerson {
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
  subscription OnDeleteFitPerson {
    onDeleteFitPerson {
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
