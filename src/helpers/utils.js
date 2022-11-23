// Formats UPDATE query params for the SET syntax of PostgreSQL:
// ... SET param1='content1', param2='content2' ...
// Gets an array of objects, each with the column name and update content.
// Filters for valid content, formats to the aforementioned syntax then
// inserts a comma if needed.
const formatSetQueryParams = (columns) => {
  const validParams = columns.filter(column => column.content)

  const paramsArray = validParams.map((column, index) =>
    `${column.name}='${column.content}'` +
    `${index !== validParams.length - 1 ? ', ' : ''}`
  )
  return paramsArray.join('')
}

export { formatSetQueryParams }
