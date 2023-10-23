document.addEventListener('DOMContentLoaded', function() {
    try {
      let app = firebase.app();
      console.log(app)

    } catch (e) {
      console.error(e);
    }

  });

function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user)
        })
        .catch(console.log)

}