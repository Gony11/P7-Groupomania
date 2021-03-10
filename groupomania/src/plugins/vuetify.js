import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#d1515a',
                secondary: '#091F43',
            }
        }
    },
    icons: {
        iconfont: 'mdi'
    }
});
