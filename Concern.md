## Review

https://review.udacity.com/#!/reviews/2250909

## Concern 1

---

I couldn't reproduce adding book multiple times. I doubt if that is possible. I clicked on a book control for the same shelf multiple times but saw only one instance of the book on the
main page.
Please share the steps for reproducing the scenario in your next submission.

#### My response:

**Steps :**

1.  Go to the search page and search some books
2.  Go to any book and select any shelf except none, it will add it to the main page
3.  Go to the same book and again select the same shelf as done in step2.
4.  Multiple books will appear in the shelf for the same id hence the key error. (can remove the key error by adding key={`${book.id}${idx}`} but that will affect the performance in a bad way.)

![](./readmeImages/concern1.gif)

## Concern 2

---

The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance. The functionality of moving a book to a different shelf works correctly.

Good job! The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance. However, the functionality of moving a book to a different shelf doesn't work correctly.

To Reproduce:
1- Goto main page and click on the control for moving the book of a book and select a book. Nothing happens. Click the second time, the book is moved to the new shelf.

Expected:

Should work on one click on select.

#### My response:

I checked it out the books are moving on first clicks as well. I can't understand the problem. Can you send a gif of the thing that is not working?
Here is the gif of my functionality.

![](./readmeImages/concern2.gif)
I guess it working correctly.
