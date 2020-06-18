export default function Color(currentColor) {

  let colors = ['rgb(176, 224, 230)',
    'rgb(255, 185, 90)',
    'rgb(144, 238, 144)',
    'rgb(253, 124, 110)',
    'rgb(242, 158, 171)',
    'rgb(200, 162, 200)',
    'rgb(251, 236, 93)',
    'rgb(187, 187, 187)'
  ]
  let nextColor = colors.indexOf(currentColor) + 1
  return nextColor === 8 ? colors[0] : colors[nextColor]

}

