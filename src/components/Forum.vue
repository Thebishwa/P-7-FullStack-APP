<template>
  <article>
    <section v-if="user" class="sticky">
      <div class="create-post-form">
        <div class="profile-img">
          <img src="../images/default_user_icon.jpg">
        </div>
        <div class="nav-user">
          <button @click="newPost">Create post</button>
          <button @click="getPosts()">All posts</button>
          <button @click="myPosts()">My posts</button>
        </div>
      </div>
    </section>
    <section v-for="(post, index) in allPosts" :key="index" @click="isRead(post.post_id)">
      <div class="post">
        <div class="post_user">
          <div class="profile-img-post">
            <img src="../images/default_user_icon.jpg">
          </div>
          <div>
            <div class="profile-name">by {{ post.User.firstName }} {{ post.User.lastName }}</div>
            <div class="profile-name">at {{ post.date }}</div>
          </div>
        </div>
    
        <!-- post read/unread toggle -->
        <div class="read" v-if="read.find(x => {if(x.userId == user && x.postId == post.post_id && x.isRead == true){ return true; } return false;})">Read</div>
        <div class="unread" v-else>Unread</div>

        <!-- post content -->
          <!-- text -->
        <div class="post_content">{{ post.postText }}</div>
          <!-- image -->
        <div v-if="post.imageUrl != null" class="post_content"><img :src="post.imageUrl"></div>
        <!-- like counter-->
        <div v-for="(like, index) in allLikes" :key="index">
          <div class="like" v-if="post.post_id == like.postId">{{ like.n_like }} people like this post</div>
        </div>
        <!-- post buttons -->
        <div class="post_buttons">
          <button @click="toggleInput(post.post_id)">Comment</button>
            <button @click="likes(post.post_id)">Like</button>
          <button v-if="post.userId == user" @click="newPostUpdate(post.post_id)" >
            Update</button>
          <button v-if="post.userId == user" id="delete-button" @click="deletePost(post.post_id)">
            Delete</button>
        </div> 
      </div>
      <!-- comment input -->
        <div class="commentInput" v-if="showInput == post.post_id">
          <textarea placeholder="Write some text..." v-model="comment.comText"></textarea>
          <button @click="postComment(post.post_id)">Post</button>
          <button @click="resetComment()">Reset</button>
        </div>  
      <!-- </div> -->
      <!-- comments -->
      <div class="comments" v-for="(comment, index) in post.Comments" :key="index">
          <div class="post_user">
            <div class="profile-img-post">
              <img src="../images/default_user_icon.jpg">
            </div>
            <div>
              <div class="profile-name">by {{ comment.User.firstName }} {{ comment.User.lastName }}</div>
              <div class="profile-name">at {{ comment.comCreatedAt }}</div>
            </div>
          </div>
          
          <div class="comment-content">{{ comment.comText }}</div>
          <div class="post_buttons">
            <button v-if="comment.userId == user" @click="toggleInputUpdate(comment.id, post.post_id)">
              Update</button>
            <button v-if="comment.userId == user" id="delete-button" @click="deleteComment(comment.id)">
              Delete</button>
          </div>
          <!-- comment input update-->
          <div class="commentInputUpdate" v-if="showInputUpdate_comId == comment.id && showInputUpdate_postId == post.post_id">
            <textarea placeholder="Write some text..." v-model="updateCom"></textarea>
            <button @click="updateComment(comment.id)">Update</button>
            <button @click="resetCommentUpdate(comment.id)">Reset</button>
          </div>
      </div>

    </section>
  </article>
</template>


<script>
  import axios from 'axios';

  export default {
    name: "Forum-page",
    data() {
      return {
        user: null,
        allPosts: [],
        allLikes: [],
        read:[],
        comment: {
          comText:'',
          postId:'',
          userId:'',
        },
        updateCom:'',
        showInput: '',
        showInputUpdate_comId:'',
        showInputUpdate_postId:'',
        like:{
          postId:'',
          userId:'',
          liked: false
        },
      };
    },

    methods: {
      ///////////////////////////////////////////////////////////////////////
      // isRead - change if the user click on the section of the post
      isRead(postId){
        const url = '/post/isRead'
        const userId = parseInt(localStorage.userId)
        let isAlreadyRead = false
        
        this.read.forEach((item) => {
          if (item.postId == postId){
            isAlreadyRead = true 
          }
        })
        if (isAlreadyRead == false){
        let isRead = true
        const data = { userId, postId, isRead }
        this.read.push(data)

        axios.post( url, data, {
          headers : {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          })
        }
      },
      /////////////////////////////////////////////////////////////////////
      // user likes a post
      async likes(postId) {
        this.like.postId = postId;
        this.like.userId = this.user;
        if(this.like.liked == false ){
        const url = `api/post/like/all/${postId}`;
        await axios.post(url, {
          userId: this.like.userId,
        }, 
        { headers: {
          Authorization: "Bearer " + localStorage.getItem("token")}
        }).then(response => {
          console.log(response);
          this.like.liked = true;
          window.location.reload();
        }).catch(error => {
          console.log(error);
          this.like.liked = false;
        });
        }
      },
      /////////////////////////////////////////////////////////////////////
      // user comment - delete
      async deleteComment(comId){
        const url = `/api/comment/delete/${comId}`;
          await axios.delete(url, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
          }).then((response) => {
            let res = JSON.parse(response.data);
            console.log(res);
            window.location.assign("/home");
          }).catch((error) => console.log(error.message));
      },
      /////////////////////////////////////////////////////////////////////
      // user comment - post
      async postComment(postId) {
        if (this.comment.comText == '') {
          alert('Please write some text!')
        } else {
          this.comment.postId = postId
          let comText = this.comment.comText
          let userId = localStorage.userId
          let data = { postId, comText, userId }

          axios.post(`/api/comment/create`, data,{
            headers : {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(response => {
            console.log(response);
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
        }
      },
      //////////////////////////////////////////////////////////////////////////////////////////
      //update user - axios put
      async updateComment(comId){
        const userId = localStorage.userId
        const url = `/api/comment/update/${comId}`
        const updateComment = { 
          comText: this.updateCom,
          userId: userId,
          comId: comId
        }
        await axios.put(url, updateComment, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then((response) => {
          const res = response.data;
          console.log(res);
          window.location.assign("/home");
        })
        .catch((error) => {
          alert(error.message)
        });
        
      },

      /////////////////////////////////////////////////////////////////////
      // toggle comment input
        toggleInput(postId) {
          if (this.showInput != postId){
            this.showInput = postId
          } else {
            this.showInput = ''
          }
        },
      /////////////////////////////////////////////////////////////////////
      // toggle comment update input 
        toggleInputUpdate(comId, postId) {
        // this.showInputUpdate = !this.showInputUpdate
        console.log(comId, postId)
        if (this.showInputUpdate_comId != comId || this.showInputUpdate_postId != postId ){
          this.showInputUpdate_comId = comId
          this.showInputUpdate_postId = postId
        } else {
          this.showInputUpdate_comId = ''
          this.showInputUpdate_postId = ''
        }
        },
      /////////////////////////////////////////////////////////////////////
      // reset comment input
        resetComment() {
          this.comment.comText = ''
        },
      /////////////////////////////////////////////////////////////////////
      // reset comment input update
        resetCommentUpdate() {
          this.updateCom = ''
        },
        /////////////////////////////////////////////////////////////////////
        // get all post and comment if user press button 'All posts' on navbar
        async getPosts() {
            const url = `/post/all/`;
            await axios.get(url, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            }).then(response => {
                let posts = response.data;
                this.allPosts = posts;
            }).catch(error => { console.log(error) });
        },
        /////////////////////////////////////////////////////////////////////
        // get all posts by author if user press button 'My posts' on navbar
        async myPosts() {
            const user = localStorage.userId
            const url = `/post/all/${user}`;
            await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                let posts = response.data;
                this.allPosts = posts;
            }).catch(error => { console.log(error)});
        },
        /////////////////////////////////////////////////////////////////////
        newPost() {
            this.$router.push("home/create");
        },
         /////////////////////////////////////////////////////////////////////
        newPostUpdate(postId) {
          console.log(postId)
          localStorage.setItem("postUpdate", postId)
          this.$router.push("home/create");
        },
        /////////////////////////////////////////////////////////////////////
        // delete post
        async deletePost(postId) {
          const url = `/post/all/${postId}`;
          await axios.delete(url, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
          }).then((response) => {
            let res = JSON.parse(response.data);
            console.log(res);
            window.location.assign("/home");
          }).catch((error) => console.log(error.message));
        },
        /////////////////////////////////////////////////////////////////////
    },
    async mounted() {
      /////////////////////////////////////////////////////////////////////
      //get all posts and comments from the DB
      await axios.get("/post/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
          }
      }).then(response => {
        let posts = response.data;
        this.allPosts = posts;
      }).catch(error => (console.log(error)));
      // user logged - store userId in LocalStorage
      this.user = localStorage.getItem("userId");

      /////////////////////////////////////////////////////////////////////
      // get all likes - counter
      await axios.get("api/post/like/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(response => {
        let likes = response.data;
        this.allLikes = likes;
      }).catch(error => (console.log(error)));

      /////////////////////////////////////////////////////////////////////
      // isRead
      const userId = this.user
      await axios.get(`post/status/isRead/${userId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(response => {
        let read = response.data;
        this.read = read;
        if (read.length > 0) {
          this.readEmpty = false
        } else {
          this.readEmpty = true
        }
      }).catch(error => (console.log(error)));
    },
};
</script>

<style>

.unread {
  padding-left:5px;
  font-size: large;
  border: 2px solid rgb(203, 7, 7);
  color: rgb(203, 7, 7);
  width: 65px;
  font-style: italic;
}

.read {
  padding-left:5px;
  font-size: large;
  border: 2px solid grey;
  color:grey;
  width: 45px;
  font-style: italic;
}

.like {
  font-weight: lighter;
  font-size: large;
  font-style: italic;
  display:flex;
  justify-content: flex-end;
  padding-right: 15px;
}

.commentInput {
  width: 51%;
  min-height: 80px;
  margin:auto;
  margin-top:20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding:10px;
  max-width: 1200px;
}

.commentInputUpdate{
  width: 95%;
  min-height: 80px;
  margin:auto;
  margin-top:20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding:10px;
  max-width: 1200px;
}
.comments {
  min-height: 80px;
  width: 50%;
  margin:auto;
  margin-top:20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding:15px;
  max-width: 1200px;
}

.comment-content {
  min-height:50px;
  padding:10px;
  font-weight: lighter;
  font-size: large;
}

.sticky {
  position: sticky;
  top: 65px;
}

.create-post-form {
  min-height: 80px;
  width: 80%;
  margin:auto;
  display:flex;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: #333;
  padding:10px;
  max-width: 1200px;
}

.create-post-form button {
  margin-left: 10px;
  margin-right: 10px;
  width: 200px;
  height: 40px;
  border: 2px solid white;
  color: white;
  border-radius: 10px;
  font-size:large;
  font-weight: lighter;
}

.create-post-form button:active {
  background:rgb(1, 49, 1);
  opacity: 0.95;
}

.profile-img {
  
  height: 60px;
  width: 60px;
  margin:auto
}

.profile-img img {
  height: 60px;
  object-fit: contain
}

.profile-img-post img {
  height: 40px;
  object-fit: contain
}

.nav-user{
  min-height: 40px;
  width: 85%;
  margin: 20px;
  display: flex;
  justify-content: space-between;
}

button {
  margin-right: 10px;
  width: 100px;
  height: 40px;
  border: 2px solid white;
  background: #333;
  color: white;
  border-radius: 10px;
  font-size:large;
  font-weight: lighter;
}

button:hover{
  border-color: aqua;
  transition: 0.9s;
}

.post {
  border-radius: 10px;
  margin:auto;
  min-height: 220px;
  width: 75%;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.post_user {
  border-radius: 10px;
  margin:auto;
  min-height: 60px;
  display:flex;
  justify-content: space-between;
  overflow: hidden;
  font-style: italic;
}

.post_user .profile-img-post {
  height: 40px;
  min-width: 40px;
  margin-left: 10px;
  margin-top:10px

}

.profile-name {
  height: 28px;
  min-width: 170px;
  margin:auto;
  margin-left:10px;
  margin-right:10px;
  font-size:large;
  font-weight: lighter;
}

.post_content {
  border-radius: 10px;
  margin:auto;
  min-height: 40px;
  padding:10px;
  overflow-wrap: break-word;
  font-size:large;
  font-weight: lighter;
  text-align: justify;
}

.post_content img{
  max-width: 100%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.post_buttons{
  display:flex;
  justify-content: center;
  border-radius: 10px;
  margin:auto;
  min-height: 30px;
  padding:10px
}

button:hover {
  border-color: #333;
  transition: 0.8s;
  background-color: green;
}

#delete-button{
  background: #333;
}

#delete-button:hover{
  background: rgb(232, 3, 3);
  border-color: #333;
  transition: 0.4s;
  font-weight:bold;
}

@media only screen and (max-width: 1252px) {
  button {
    margin-top:10px
  }
}

@media only screen and (max-width: 768px) {
  .post_buttons {
    display:block;
  }
  
}

@media only screen and (max-width: 660px) {
  .create-post-form {
    text-align: center
  }
  .nav-user{
    display: block;
  }
}

@media only screen and (max-width: 487px) {
  
  .nav-user {
    width: 100%;
    display:flex;
    margin:0;
  }
  .profile-img {
    display:none;
  }
  .create-post-form {
    width: 95%;
    min-height: 60px;
    justify-content: center;
  }
  .post{
    width: 85%;
  }
  .commentInput{
    width: 67%;
  }
  .comments{
    width: 65%;
  }
}

@media only screen and (max-width: 380px) {
 .sticky{
  top:55px;
 }
}
   
</style>
