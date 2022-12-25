// Formats UPDATE query params for the SET syntax of PostgreSQL:
// ... SET param1='content1', param2='content2' ...
// Inserts a comma if needed.
const formatSetQueryParams = (columns) => {
  const nonEmptyParams = columns.filter(column => column.content)

  const paramsArray = nonEmptyParams.map((column, index) =>
    `${column.name}='${column.content}'` +
    `${index === nonEmptyParams.length - 1 ? '' : ', '}`
  )
  return paramsArray.join('')
}

export { formatSetQueryParams }
