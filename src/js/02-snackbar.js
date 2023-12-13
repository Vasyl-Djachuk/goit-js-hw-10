'use strict';
const form = document.querySelector(`.form`);

form.addEventListener(`submit`, event => {
  event.preventDefault();
  const status = event.target.elements.state.value;
  const delay = event.target.elements.delay.value;

  setTimeout(() => {
    const promise = new Promise((resolve, reject) => {
      if (status === `fulfilled`) {
        resolve(delay);
      } else {
        reject(delay);
      }
    });

    promise
      .then(delay => {
        iziToast.show({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: `topCenter`,
          color: 'green',

          messageSize: '18',
        });
      })
      .catch(delayE => {
        iziToast.show({
          message: `❌ Rejected promise in ${delayE}ms`,
          position: `topCenter`,
          color: `red`,
          messageColor: 'white',
          messageSize: '18',
        });
      });
  }, delay);
  form.reset();
});
