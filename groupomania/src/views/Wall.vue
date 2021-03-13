<template>
  <v-container>
      <v-row justify="center">
          <v-col lg="6">
              <v-btn block color="secondary" @click.stop="addPost = true">Publier du contenu</v-btn>
          </v-col>
      </v-row>
      <v-row v-for="(post, i) in posts" :key="i + 0" justify="center">
        <v-col lg="6">
            <v-card>
                <v-card-text>
                    <v-col>
                        <v-row align="center">
                            <v-avatar v-if="post.user.url_image" size="40" color="primary white--text">{{post.user.url_image}}</v-avatar>
                            <v-avatar v-else size="40" color="primary white--text" style="text-transform: uppercase;">{{post.user.firstname.substr(0, 1)}} {{post.user.name.substr(0, 1)}}</v-avatar>
                            <v-col>
                                <div class="text-subtitle-2 secondary-text">{{post.user.firstname}} {{post.user.name}}</div>
                                <div class="text-caption secondary-text">le {{new Date(post.created_at).toLocaleDateString('fr-FR')}}</div>
                            </v-col>
                            <v-menu v-if="post.user.id == user.id || user.role == 1" rounded transition="scale-transition" origin="top right" left z-index="0">
                                <template v-slot:activator="{ on }">
                                <v-btn color="primary" icon v-on="on">
                                    <v-icon color="primary">more_vert</v-icon>
                                </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item link>
                                        <v-list-item-title @click="deletePost(post.id)">Supprimer le post</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item link>
                                        <v-list-item-title>Modifier le post</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-row>
                        <v-row>
                            <div class="my-3">
                                {{post.content}}
                            </div>
                        </v-row>
                        <v-row v-if="post.media">
                            <v-img v-if="post.media.substr(-3) != 'mp4'" class="my-3" :aspect-ratio="16/9" contain :src="post.media"></v-img>
                            <video v-else :src="post.media" class="my-3" style="width: 100%;" controls></video>
                        </v-row>
                        <v-row justify="space-between" class="my-3">
                            <div>{{post.like}} j'aimes</div>
                            <div v-if="post.nb_comments > 0" style="cursor: pointer;" @click="postSelected = post.id; getComments(); getComs = true;">{{post.nb_comments}} commentaires</div>
                            <div v-else>{{post.nb_comments}} commentaires</div>
                        </v-row>
                        <v-row class="my-3">
                            <v-divider></v-divider>
                        </v-row>
                        <v-row justify="space-around" class="mt-3">
                            <v-btn text><v-icon left>favorite</v-icon> J'aime</v-btn>
                            <v-btn text @click="addComment = true; postSelected = post.id;"><v-icon left>comment</v-icon>Commenter</v-btn>
                        </v-row>
                    </v-col>
                </v-card-text>
            </v-card>
        </v-col>
      </v-row>
      <!-- <v-row justify="center">
          <v-col lg="6" class="text-right">
            <v-btn fab color="secondary">
                <v-icon>add</v-icon>
            </v-btn>
          </v-col>
      </v-row> -->

    <v-row justify="center">
        <v-dialog v-model="addPost" max-width="800">
                    <v-card>
                        <v-card-title>Ajouter du contenu</v-card-title>
                        <v-card-text>
                            <v-form>
                                <v-textarea solo v-model="contentPost"></v-textarea>
                                <div v-if="urlMedia" style="text-align: center;box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);border-radius: 5px;padding: 15px;">
                                    <div style="text-align: right;" >
                                        <v-icon large @click="urlMedia = ''; $refs.uploader.value = null;">clear</v-icon>
                                    </div>
                                    <img v-if="typeMedia == 'image'" :src="urlMedia" alt="">
                                    <video v-else-if="typeMedia == 'video'" :src="urlMedia" style="width: 100%;" :type="typeMedia" controls></video>
                                </div>
                                <v-btn v-else block color="secondary" @click="addMedia">Ajouter un média</v-btn>
                                <input ref="uploader" class="d-none" type="file" name="media" @change="onFileChanged">
                                <v-divider light class="my-5"></v-divider>
                                <v-btn block color="primary" @click="createPost">Publier le contenu</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
        </v-dialog>
    </v-row>

    <v-row justify="center">
        <v-dialog v-model="addComment" max-width="800">
                    <v-card>
                        <v-card-title>Ajouter un commentaire</v-card-title>
                        <v-card-text>
                            <v-form>
                                <v-textarea solo v-model="contentComment"></v-textarea>
                                <v-btn block color="primary" @click="createComment">Enregistrer le commentaire</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
        </v-dialog>
    </v-row>

    <v-row justify="center">
        <v-dialog v-model="getComs" max-width="800">
                    <v-card>
                        <v-card-title>Commentaires</v-card-title>
                        <v-card-text>

                            <v-row v-for="(comment, i) in comments" :key="i">
                                <v-col>

                            <v-card >
                                <v-card-text>

                            <v-col >
                                <v-row align="center">
                                    <v-avatar v-if="comment.user.url_image" size="40" color="primary white--text">{{comment.user.url_image}}</v-avatar>
                                    <v-avatar v-else size="40" color="primary white--text" style="text-transform: uppercase;">{{comment.user.firstname.substr(0, 1)}} {{comment.user.name.substr(0, 1)}}</v-avatar>
                                    <v-col>
                                        <div class="text-subtitle-2 secondary-text">{{comment.user.firstname}} {{comment.user.name}}</div>
                                        <div class="text-caption secondary-text">le {{new Date(comment.created_at).toLocaleDateString('fr-FR')}}</div>
                                    </v-col>
                                    <v-menu rounded transition="scale-transition" origin="top right" left z-index="203">
                                        <template v-slot:activator="{ on }">
                                        <v-btn color="primary" icon v-on="on">
                                            <v-icon color="primary">more_vert</v-icon>
                                        </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item link>
                                                <v-list-item-title>Supprimer le commentaire</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item link>
                                                <v-list-item-title>Modifier le commentaire</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </v-row>
                                <v-row>
                                    <div class="my-3">
                                        {{comment.content}}
                                    </div>
                                </v-row>
                            </v-col>
                                </v-card-text>
                            </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
        </v-dialog>
    </v-row>

  </v-container>
</template>

<script>
import api from '../api'

export default {
    name: "Wall",
    data() {
        return {
            posts: [],
            addPost: false,
            addComment: false,
            contentPost: '',
            media: null,
            contentComment: '',
            postSelected: null,
            comments: [],
            getComs: false,
            urlMedia: '',
            typeMedia: '',
            user: {
                id: 1,
            },
        }
    },
    methods: {
        initPosts() {
   
                api().get('posts')
                .then(response => {
                    this.posts = response.data.filter(post => post.user)
                    this.user.id = sessionStorage.getItem('userId')
                    this.user.role = sessionStorage.getItem('userRole')
                    })
                .catch(() => {
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('userId')
                    this.$router.replace({ name: "Login" });
                    })
        },

        createPost() {

            let formData = new FormData();

            formData.append('media', this.media)
            formData.append('content', this.contentPost)

            api().post('posts', formData)
                .then(() => {

                    this.initPosts()

                    this.addPost = false;

                    setTimeout(() => {
                        this.contentPost = ''
                        this.urlMedia = ''
                        this.typeMedia = ''
                    }, 250);

                })
                .catch(err => console.log(err))
        },

        deletePost(i) {
            api().delete('posts/' + i)
            .then(() => {

                this.posts.forEach((post, index) => {
                    if(post.id == i) {
                        this.posts.splice(index, 1)
                    }
                });

                this.initPosts();
            })
            .catch(error => console.log(error))
        },

        createComment() {

            api().post('posts/comments', {
                content: this.contentComment,
                postId: this.postSelected
            })
                .then(() => {
                    this.initPosts()
                    this.addComment = false
                    this.contentComment = ''
                })
                .catch(err => console.log(err))
        },

        getComments() {
            api().get('posts/comments/' + this.postSelected)
                .then(res => {
                    this.comments = res.data
                })
                .catch(err => console.log(err))
        },

        addMedia() {
            this.$refs.uploader.click()
        },

        onFileChanged(e) {
            const file = e.target.files[0]

            this.media = this.$refs.uploader.files[0]

            this.urlMedia = URL.createObjectURL(file)

            console.log(file);

            if(file.type == 'video/mp4') {
                this.typeMedia = 'video'
            } else if(file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png') {
                this.typeMedia = 'image'
            }
        }
    },

    created() {
        this.initPosts()
    }
}
</script>

<style>

</style>