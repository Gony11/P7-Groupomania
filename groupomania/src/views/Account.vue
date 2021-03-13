<template>
    <v-container>
        <v-row align="center" justify="center" class="mt-5">
              <v-col cols="12" sm="10" md="6">
                  <v-card elevation="12">
                              <v-row>
                                  <v-col>
                                      <v-card-text>
                                          <div class="text-center text-h5  text-uppercase secondary--text mb-7">Mon compte</div>

                                          <div class="text-center text-h6 secondary--text">{{user.firstname}} {{user.name}}</div>

                                            <v-row class="my-5">
                                                <v-divider></v-divider>
                                            </v-row>

                                          <v-row justify="center">
                                            <v-col cols="12" sm="10" md="8">

                                                <div class="text-center text-h6 text-uppercase primary--text">Modifier e-mail</div>
                                                <v-form>
                                                    <v-text-field label="E-mail actuel" name="OldEmail" type="text" color="primary" ></v-text-field>
                                                    <v-text-field label="Nouvel e-mail" name="NewEmail" type="password" color="primary" ></v-text-field>
                                                </v-form>
                                                <div class="text-center my-3">
                                                    <v-btn block color="primary"  type="submit">Modifier e-mail</v-btn>
                                                </div>
                                            </v-col>
                                        </v-row>

                                                <v-row class="my-5">
                                                    <v-divider></v-divider>
                                                </v-row>

                                        <v-row justify="center">
                                            <v-col cols="12" sm="10" md="8">
                                                <div class="text-center text-h6 text-uppercase primary--text">Changer mot de passe</div>
                                                <v-form>
                                                    <v-text-field label="Mot de passe actuel" name="OldPassword" type="text" color="primary" ></v-text-field>
                                                    <v-text-field label="Nouveau mot de passe" name="NewPassword" type="password" color="primary" ></v-text-field>
                                                </v-form>
                                                <div class="text-center my-3">
                                                    <v-btn block color="primary"  type="submit">Changer mot de passe</v-btn>
                                                </div>
                                            </v-col>
                                        </v-row>

                                                <v-row class="my-5">
                                                    <v-divider></v-divider>
                                                </v-row>

                                        <v-row justify="center" class="red lighten-4 rounded">
                                            <v-col cols="12" sm="10" md="8">
                                                <div class="text-center text-h6 text-uppercase primary--text">Supprimer mon compte</div>
                                                <div class="text-center font-weight-bold my-3" style="font-size: 18px;">Attention, cette action est définitive.
                                                    <br>
                                                    Il est cependant possible de créer un nouveau compte par la suite.
                                                </div>
                                                <div class="text-center my-3">
                                                    <v-btn block color="primary" type="submit" @click="deleteAccount">Supprimer mon compte</v-btn>
                                                </div>
                                            </v-col>
                                        </v-row>
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
    name: 'Account',
    data() {
        return {
            user: '',
        }
    },

    methods: {

        getUser() {

            api().get('auth/' + sessionStorage.getItem('userId'))
                .then(res => {
                    this.user = res.data
                })
                .catch(err => {
                    console.log(err);
                })

        },

        deleteAccount() {
            api().delete('auth/' + this.user.id)
                .then(() => {
                    localStorage.removeItem('token')
                    sessionStorage.removeItem('userId')
                    sessionStorage.removeItem('userRole')
                    this.$router.replace('/login')
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },

    beforeMount() {
        
        this.getUser()

    }
}
</script>

<style>

</style>