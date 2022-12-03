<template>
  <section>
    <div class="post">
      <div class="post_content">
        <form @submit.prevent="createPost">
          <textarea type="text" name="text" col="5" placeholder="Write some text..." required v-model="post.postText"></textarea>
          <div class="upload-button">
            <input @change="handleFileUpload" lang="de"
            type="file" ref="file" name="img" id="imgInput"
            accept="image/png, image/jpeg, image/gif, image/jpg">
          </div>
        </form>
      </div>
      <div class="post_buttons">
        <button @click="createPost()">Post</button>
        <button @click="resetPost()">Reset</button>
        <button @click="updatePost()">Update</button>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "create-post",
    data() {
      return {
        post:{
          postText:'',
          userId: localStorage.userId,
          imageUrl: null,
        },
        selectedFile: null
      }
    },
    methods: {

      handleFileUpload(event) {
        this.selectedFile = event.target.files[0]
        console.log(this.selectedFile)
      },

      ////////////////////////////////////////////////////////////
      //create post
      async createPost() {
        if (this.post.postText == '') {
          alert('Please write some text or add image!')
        } else {
          const fd = new FormData()
          fd.append('image', this.selectedFile)
          fd.append('text', this.post.postText)
          fd.append('userId', this.post.userId)
          const url = '/post/newPost'
          await axios.post(url, fd, {
            headers : {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }).then((response) => {
          console.log(response);
          this.$router.push('/home')
          })
          .catch((error) => {
          console.log(error);
          });
        }
      },

      ////////////////////////////////////////////////////////////
      //update post
      async updatePost() {
        if (this.post.postText == '') {
          alert('Please write some text or add image!')
        } else {
          const postId = localStorage.getItem('postUpdate')
          const fd = new FormData()
          fd.append('image', this.selectedFile)
          fd.append('text', this.post.postText)
          fd.append('userId', this.post.userId)
          const url = `/post/updatePost/${postId}`
          await axios.put(url, fd, {
            headers : {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }).then((response) => {
          console.log(response);
          this.$router.push('/home')
          })
          .catch((error) => {
          console.log(error);
          });
        }
        localStorage.removeItem('postUpdate')
      },

      ////////////////////////////////////////////////////////////
      // delete the textarea
      resetPost() {
          this.post.postText = ''
        },
    }
  }
</script>

<style>

  .upload-button{
    display: flex;
  }

  input[type=file]::file-selector-button {
  padding: 5px 5px;
  border-radius: 5px;
  background-color: #333;
  font-weight: lighter;
  color: white;
  }

  input[type=file]::file-selector-button:hover {
  background-color: green;
  border: 2px solid #333;
  transition: 0.8s;
  }

  textarea {
    height: 130px;
    width: -webkit-fill-available;
    resize:none;
    font-size:14px;
    padding: 10px;
  }
  
  #reset {
    position: relative;
    top:14px;
    left:105px;
    margin-right: 10px;
    width: 100px;
    height: 40px;
    border: 2px solid white;
    background: green;
    color: white;
    border-radius: 10px;
    font-size:14px
  }

  #reset:hover{
    border-color: aqua;
    transition: 0.8s;
  }

  #imgInput {
    position: relative;
    top:10px;
    left:0px;
  }
</style>

<style scoped>
  .post_content{
    min-height: 150px;
  }

  .post_buttons {
    margin-top: 50px
  }
</style>
