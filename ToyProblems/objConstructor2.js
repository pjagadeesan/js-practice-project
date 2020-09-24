/* 

Create an object constructor for movies that includes properties for title,
director, writer, release date, and motion picture rating. Include a trailer() method
that prints “[movie name], written by [writer] and directed by [director],
will be released on [release date].” Include an audience() method that
prints “For audiences above the age of 16.” if the rating is R, “For audiences
above the age of 12.” if the rating is PG-13, “Parental guidance suggested” if
the rating is PG, and “For general audiences.” if the rating is G.

*/
//written in ES6

class Movie {
  // Movie Constructor here
  constructor(title, director, writer, releaseDate, rating) {
    this.title = title;
    this.director = director;
    this.writer = writer;
    this.releaseDate = releaseDate;
    this.rating = rating;
  }
  // audience method
  audience() {
    const pictureRating = new Map();
    pictureRating.set("R", "For audiences above the age of 16.");
    pictureRating.set("PG-13", "For audiences above the age of 12.");
    pictureRating.set("PG", "Parental guidance suggested.");
    pictureRating.set("G", "For general audiences.");
    console.log(pictureRating.get(this.rating));
  }

  // trailer method
  trailer() {
    console.log(`${this.title}, written by ${this.writer} and directed by ${this.director}, will be released on ${this.releaseDate}.`);
  }
}

const movies = [
  new Movie(
    "Harry Potter and the Chamber of Secrets",
    "Chris Columbus",
    "J.K.Rowling",
    "3 November 2002",
    "PG"
  ),
  new Movie("Avatar", "James Cameron", "James Cameron", "18 December 2009", "PG-13"),
  new Movie("Finding Nemo", "Andrew Stanton", 'Andrew Stanton',"30 May 2003", "G"),
];

movies.forEach(m => {
    m.trailer();
    m.audience();
    console.log('--------------------------------')
})