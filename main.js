const renderBook = book => `
  <div class="book">
    <img class="cover" src="covers/${book.cover}">
    <div class="details">
      <div>${book.title}</div>
      <div>${book.author}</div>
      ${book.goodreads ? `
        <div>
          <a href="${book.goodreads}">Goodreads</a>
        </div>
      ` : ''}
    </div>
  </div>
`;

const compareBook = (a, b) => {
  if (a.date < b.date){
    return -1;
  } else if (a.date > b.date){
    return 1;
  } else {
    return 0;
  }
}

(async () => {
  const resp = await fetch(`books.yaml?v=${new Date().getTime()}`);
  const text = await resp.text();
  const data = jsyaml.load(text);

  // const today = new Date('2019-03-01');
  const today = new Date();

  document.getElementById('upcoming').innerHTML = data.books
    .filter(b => b.date >= today)
    .sort(compareBook)
    .map(renderBook)
    .join('');

  document.getElementById('past').innerHTML = data.books
    .filter(b => b.date < today)
    .sort(compareBook)
    .reverse()
    .map(renderBook)
    .join('');

})()
