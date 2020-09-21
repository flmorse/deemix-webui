import store from '@/store'

export const socket = io.connect(window.location.href)

socket.on('connect', () => {
	document.getElementById('start_app_placeholder').classList.add('loading_placeholder--hidden')
})

socket.on('init_update', data => {
	store.dispatch('setAboutInfo', data)
})
