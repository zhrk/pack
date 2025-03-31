module.exports = {
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': [
      {
        groupName: 'block-meta',
        properties: ['content', 'counter-increment', 'counter-reset', 'list-style'],
      },
      {
        groupName: 'block-position',
        properties: [
          'z-index',
          'position',
          'inset',
          'top',
          'right',
          'bottom',
          'left',
          'transform',
          'order',
        ],
      },
      {
        groupName: 'block-margin',
        properties: ['margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
      },
      {
        groupName: 'block-padding',
        properties: ['padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
      },
      {
        groupName: 'block-size',
        properties: ['max-width', 'min-width', 'width', 'max-height', 'min-height', 'height'],
      },
      {
        groupName: 'block-display',
        properties: [
          'display',
          'align-self',
          'flex-direction',
          'justify-content',
          'align-items',
          'flex-grow',
          'flex-shrink',
          'flex-wrap',
          'grid-auto-flow',
          'grid-auto-rows',
          'grid-auto-columns',
          'grid-template-rows',
          'grid-template-columns',
          'gap',
          'row-gap',
          'column-gap',
        ],
      },
      {
        groupName: 'block-appearance',
        properties: [
          'box-shadow',
          'outline',
          'border-collapse',
          'border',
          'border-width',
          'border-style',
          'border-color',
          'border-top',
          'border-right',
          'border-bottom',
          'border-left',
          'border-top-width',
          'border-right-width',
          'border-bottom-width',
          'border-left-width',
          'border-top-style',
          'border-right-style',
          'border-bottom-style',
          'border-left-style',
          'border-top-color',
          'border-right-color',
          'border-bottom-color',
          'border-left-color',
          'box-sizing',
          'border-radius',
          'border-top-left-radius',
          'border-top-right-radius',
          'border-bottom-right-radius',
          'border-bottom-left-radius',
          'background',
          'background-image',
          'background-size',
          'background-repeat',
          'background-color',
          'background-position',
          'mask-image',
          'mask-size',
          'mask-repeat',
          'mask-position',
          'backdrop-filter',
        ],
      },
      {
        groupName: 'block-text',
        properties: [
          'color',
          'font',
          'font-family',
          'font-size',
          'font-weight',
          'src',
          'line-height',
          'letter-spacing',
          'text-decoration',
          'text-transform',
          'text-overflow',
          'text-align',
          'vertical-align',
          'white-space',
          'word-break',
          'overflow-wrap',
        ],
      },
      {
        groupName: 'block-svg',
        properties: [
          'fill',
          'stroke',
          'stroke-width',
          'stroke-linecap',
          'stroke-dasharray',
          'stroke-dashoffset',
        ],
      },
      {
        groupName: 'block-meta-appearance',
        properties: ['visibility', 'opacity', 'filter', 'object-fit'],
      },
      {
        groupName: 'block-animation',
        properties: [
          'animation',
          'animation-name',
          'animation-duration',
          'animation-timing-function',
          'animation-fill-mode',
          'transition',
          'transition-property',
        ],
      },
      {
        groupName: 'block-outside',
        properties: [
          'overflow',
          'overflow-x',
          'overflow-y',
          'scrollbar-width',
          'scrollbar-color',
          'scroll-padding-bottom',
          'overscroll-behavior',
        ],
      },
      {
        groupName: 'block-interaction',
        properties: ['pointer-events', 'user-select', 'touch-action', 'cursor', 'resize'],
      },
      {
        groupName: 'block-performance',
        properties: ['will-change'],
      },
    ],
  },
};
