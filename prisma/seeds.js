const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories = ['Task', 'Random Thought', 'Idea', 'Quote'];
const randomId = () =>
  Math.round(Math.random() * categories.length) === 0
    ? 1
    : Math.round(Math.random() * categories.length);
const parseDate = (str) =>
  str.match(/\d{1,2}[-.\/]?\d{1,2}[.,\/]\d{1,2}[.,\/]\d{1,4}/g) || [];

const notes = [
  {
    title: 'Shopping list',
    content:
      'Your task is to create a notes app in JS as a web app. Users can add, edit and remove notes.',
  },
  {
    title: 'list',
    content:
      'Notes in the table should also display a list of dates mentioned in this note as a separate column. For example, for a note “I’m gonna have a dentist appointment on the 03/05/2021, I moved it from 05/05/2021” the dates column is “30/05/2021, 05/05/2021”',
  },
  {
    title: 'js',
    content:
      'List of notes is displayed in a form of table (HTML representation may vary: table, divs etc). The columns 12.12.22   05.04.08 are time of creation, note content, note category. Categories are predefined: “Task”, “Random Thought”, “Idea”',
  },
  {
    title: 'lol',
    content:
      'Notes in the table should also display a list of dates mentioned in this note as a separate column. For example, for a note “I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021” the dates column is “3/5/2021, 5/5/2021”',
  },
  {
    title: 'react',
    content:
      'Users can archive notes. Archived notes are not shown in the notes list. Users can view archived notes and un archive them.',
  },
  {
    title: 'vue',
    content:
      'There should also be a summary table which counts notes by categories: separately for active and archived. The table is updated whenever users perform some action on notes. The summary table is shown on the same page as the notes table.',
  },
  {
    title: 'angular',
    content:
      'There is no need to implement data storage. Simply create a JS variable which stores the data and pre populate it with 7 notes so that they are shown when the page is reloaded.',
  },
  {
    title: 'laravel',
    content:
      'The goal of the task is to let you get better acquainted with the JavaScript language and browser DOM API. If you don’t know some of the APIs needed for the task, you might use these resources as references:',
  },
];

const fn = async () => {
  for (let catName of categories) {
    const cat = await prisma.category.create({ data: { name: catName } });
    console.log(cat);
  }
  for (let item of notes) {
    const note = await prisma.note.create({
      data: {
        title: item.title,
        content: item.content,
        dates: parseDate(item.content).join(' '),
        categoryId: 1,
      },
    });
    console.log(note);
  }
};

fn();
