<template>
      <v-container class="fill-height">
          <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="3">
                  <v-card elevation="12">
                              <v-row>
                                  <v-col>
                                      <v-card-text>
                                          <v-img src="../assets/images/icon-above-font.svg" max-height="250"></v-img>
                                          <div class="text-center text-h5  text-uppercase secondary--text">Inscription</div>
                                          <v-form>
                                              <v-text-field label="Prénom" name="firstname" type="text" color="primary" v-model="firstname"></v-text-field>
                                              <v-text-field label="Nom" name="name" type="text" color="primary" v-model="name"></v-text-field>
                                              <v-text-field label="Email" name="email" type="text" color="primary" v-model="email"></v-text-field>
                                              <v-text-field label="Mot de passe" name="password" type="password" color="primary" v-model="password"></v-text-field>
                                          </v-form>
                                        <div class="text-center my-3">
                                            <v-btn block color="primary" @click="signUp">S'inscrire</v-btn>
                                        </div>
                                            <v-col>
                                                <v-row>
                                                    <div><router-link to="/login" class="text-decoration-none">J'ai déjà un compte, je me connecte !</router-link></div>
                                                </v-row>
                                            </v-col>
                                      </v-card-text>
                                  </v-col>
                              </v-row>
                  </v-card>
              </v-col>
          </v-row>
      </v-container>
</template>

<script>
import api from '../api'

export default {
    name: 'Login',
    data() {
        return {
            firstname: '',
            name: '',
            email: '',
            password: '',
        }
    },

    methods: {

        signUp() {

            api().post('auth/signup', {
                firstname: this.firstname,
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>

<style>

</style>