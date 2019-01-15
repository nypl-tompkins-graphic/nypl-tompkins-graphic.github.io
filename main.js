const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const Category = {
  Current: 'current',
  Upcoming: 'upcoming',
  Past: 'past',
};

const dateToStr = date => {
  const pad = (count, num) => String(num).padStart(count, '0');
  return [
    pad(4, date.getFullYear()),
    pad(2, date.getMonth() + 1),
    pad(2, date.getDate()),
  ].join('/');
}

const renderDate = (book, category) => {
  switch (category) {
    case Category.Past:
      return '';
    case Category.Current:
      return `<div class="date">This Month</div>`;
    default:
      return `
        <div class="date">
          ${book.displayDate}
        </div>
      `;
  }
};

const renderCover = book => `
  <div class="container">
    <img class="cover" src="covers/${book.cover}">
    <div class="details">
      <div class="title">${book.title}</div>
      <div class="author">${book.author}</div>
      ${book.goodreads ? `
        <div class="goodreads">
          <a href="${book.goodreads}">Goodreads</a>
        </div>
      ` : ''}
    </div>
  </div>
`;

const renderBook = (book, category) => {
  if (!book.cover){
    return '';
  }
  return `
    <div class="book">
      ${renderDate(book, category)}
      ${renderCover(book, category)}
    </div>
  `;
};

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
  const yesterday = dateToStr(new Date(today - 1000*60*60*24));

  const books = data.books.map(book => {
    book.year = parseFloat(book.date.split('/')[0]);
    book.month = parseFloat(book.date.split('/')[1]);
    book.day = parseFloat(book.date.split('/')[2]);
    book.monthName = monthNames[book.month - 1];

    const todayYear = parseFloat(today.getFullYear());
    book.displayDate = book.year >= todayYear
      ? `${book.monthName} ${book.day}`
      : `${book.monthName} ${book.day}, ${book.year}`;

    return book;
  });

  const upcomingBooks = books
    .filter(b => b.date >= yesterday)
    .sort(compareBook);
  const pastBooks = books
    .filter(b => b.date < yesterday)
    .sort(compareBook)
    .reverse();

  if (upcomingBooks.length){
    document.getElementById('this-month').innerHTML = renderBook(upcomingBooks[0], Category.Current);
  }

  document.getElementById('upcoming').innerHTML = upcomingBooks
    .filter((b, i) => i > 0)
    .map(book => renderBook(book, Category.Upcoming))
    .join('');

  document.getElementById('past').innerHTML = pastBooks
    .map(book => renderBook(book, Category.Past))
    .join('');

})()
