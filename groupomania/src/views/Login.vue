<template>
      <v-container v-if="visible" class="fill-height">
          <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="3">
                  <v-card elevation="12">
                              <v-row>
                                  <v-col>
                                      <v-card-text>
                                          <v-img src="../assets/images/icon-above-font.svg" max-height="250"></v-img>
                                          <div class="text-center text-h5  text-uppercase secondary--text">Connexion</div>
                                          <v-form>
                                              <v-text-field label="Email" name="Email" type="text" color="primary" v-model="email"></v-text-field>
                                              <v-text-field label="Mot de passe" name="Password" type="password" color="primary" v-model="password"></v-text-field>
                                          </v-form>
                                        <div class="text-center my-3">
                                            <v-btn block color="primary" @click="loginForm" type="submit">Se connecter</v-btn>
                                        </div>
                                            <v-col>
                                                <v-row>
                                                    <div>Mot de passe oublié ?</div>
                                                    <v-spacer></v-spacer>
                                                    <div><router-link to="/signup" class="text-decoration-none">S'inscrire</router-link></div>
                                                </v-row>
                                            </v-col>
                                      </v-card-text>
                                  </v-col>
                              </v-row>
                  </v-card>
              </v-col>
          </v-row>
          <v-snackbar v-model="errorMessageState" color="red" content-class="text-center" transition="slide-y-reverse-transition">{{errorMessage}}</v-snackbar>
      </v-container>
</template>

<script>
import api from '../api'
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            errorMessage: 'Test de message d\'erreur',
            errorMessageState: false,
            visible: false,
        }
    },
    methods: {
        loginForm() {
            api().post('auth/login', {
                email: this.email,
                password: this.password
            })
                .then(response => {
                    console.log(response.data.user);
                    localStorage.setItem('token', response.data.token)
                    sessionStorage.setItem('userId', response.data.user.id)
                    sessionStorage.setItem('userRole', response.data.user.role)
                    this.$router.replace('/');
                    })
                .catch(error => {
                    this.errorMessage = error.response.data.message
                    this.errorMessageState = true
                    })
        },

        autoLogin() {
            if(localStorage.getItem('token')) {

                api().get('auth/' + localStorage.getItem('token'))
                .then(() => {
                    // if(localStorage.getItem('token')) {
                        this.$router.replace('/')
                    // }
                })
                .catch(err => {
                    this.visible = true
                    console.log(err.data.message)
                })
            } else {
                this.visible = true
            }
        }
    },

    beforeMount() {
        this.autoLogin();
    }
}
</script>

<style>

</style>