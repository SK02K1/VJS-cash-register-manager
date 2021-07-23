const getNoteList = () => [2000, 500, 100, 50, 20, 10, 5, 1];
const getTotalAmtToBeReturn = (totalBillAmt, cashGiven) =>
  cashGiven - totalBillAmt;
const getMinNumberOfNotes = (noteList, totalAmtToBeReturn) => {
  const noteCounter = noteList.map((note) => {
    if (note <= totalAmtToBeReturn) {
      const numberOfNotes = parseInt(totalAmtToBeReturn / note, 10);
      totalAmtToBeReturn -= note * numberOfNotes;
      return numberOfNotes;
    } else {
      return 0;
    }
  });
  return noteCounter;
};

export { getNoteList, getTotalAmtToBeReturn, getMinNumberOfNotes };
