document.addEventListener('DOMContentLoaded', function() {
    // First, we ensure that we can access firebase. If not, return an error
    try {
      let app = firebase.app();
      console.log(app)

    } catch (e) {
      console.error(e);
    }
    // Then, we grab the posts from our firebase. There is only one post "First Event!"
    const db = firebase.firestore();
    const myPost = db.collection('eventPosts').doc('FirstPost');
    // Console log the post to see if we got it
    console.log("Post data:" + myPost);
    // We then access our post to grab whatever info we need
    myPost.get()
          .then(doc => {
            const data = doc.data();
            try{
              console.log("This is the first post title: " + data.title + `<br>`)
            }
            catch(e){
              console.log("It didnt work")
            }
          })

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