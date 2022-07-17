module.exports = {
  nejdej: {
    input: {
      target: './Nejdej API.yaml',
    },
    output: {
      mode: 'tags-split',
      target: 'src/nejdej.ts',
      schemas: 'src/model',
      client: 'react-query',
      mock: true,

      override: {
        mutator: {
          path: 'src/api/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useInfinite: true,
          options: {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
          },
        },
      },
    },
  },
};
