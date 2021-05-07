import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/Login'
import patientTable from '@/views/Patients'
import visionTable from '@/views/Visions'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: {
                name: "patients-table"
            }
        },
        {
            path: "/login",
            name: 'log-in',
            components: {
                default: login
            },
        },
        {
            path: "/static",
            component: login,
            props: { "walk-in": true }
        },
        {
            path: '/patients',
            name: 'patients-table',
            components: {
                default: patientTable
            },
        },
        {
            path: '/visions',
            name: 'visions-table',
            components: {
                default: visionTable
            }
        },
    ]
})