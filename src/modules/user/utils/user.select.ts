export const userSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  avatar: true,
  age: true,
  telephone: true,
  description: true,
  links: true,
  city: true,
  styles: true,
  skills: {
    select: {
      id: true,
      experience: true,
      description: true,
      skill: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  inSearchBand: {
    select: {
      id: true,
      skill: {
        select: {
          id: true,
          name: true,
        },
      },
      description: true,
      styles: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  inSearchMusician: {
    select: {
      id: true,
      skill: {
        select: {
          id: true,
          name: true,
        },
      },
      styles: {
        select: {
          id: true,
          name: true,
        },
      },
      experience: true,
      description: true,
    },
  },
};
