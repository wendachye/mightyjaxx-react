import createStyledComponentsTransformer from 'typescript-plugin-styled-components';

const styledComponentsTransformer = createStyledComponentsTransformer();

export default {
  webpack: {
    module: {
      rules: [
        {
          loader: 'ts-loader',
          options: {
            getCustomTransformers: () => ({
              before: [styledComponentsTransformer],
            }),
          },
          test: /\.tsx?$/,
        },
      ],
    },
  },
};
