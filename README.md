# nypl-tompkins-graphic.github.io

Landing page for Book Club

## data format

- `date`: YYYY/MM/DD
- `title`: Title of Book
- `author`: Author of Book
- `cover`: url_to_book_image.jpg
- `nypl`: OPTIONAL url to NYPL page (if not preset, will offer link to search)
- `goodreads`: OPTIONAL url to goodreads page (if not preset, will offer link to search)
- `wikipedia`: OPTIONAL url to wikipedia page

example data:

```yaml
books

  - date: 2019/01/07
    title: American Born Chinese
    author: Gene Luen Yang
    cover: covers/american_born_chinese.jpg
    goodreads: https://www.goodreads.com/book/show/118944.American_Born_Chinese
    wikipedia: https://en.wikipedia.org/wiki/American_Born_Chinese
```
