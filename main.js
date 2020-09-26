Vue.use('TextareaAutosize');

Vue.filter('username', value => {
    return value.toLowerCase().replace(/\s/g, '');
})

var app = new Vue({
    el: '#app',
    data: {
        article: {
            headline: 'As California Struggles to Manage Wildfires, Health Problems Ensue',
            image: 'images/sample.jpg',
            position: 'bottom',
            invert: true,
            zoom: '100',
        },
        post: {
            liked: false,
            comments: 3,
            username: 'bhsjacket',
            verified: true,
            avatar: 'images/avatar.jpg'
        },
        status: 'Download'
    },
    methods: {
        setArticleImage: function(event) {
            let image = event.target.files[0];
            this.article.image = URL.createObjectURL(image);
        },
        downloadImage: function(event) {
            this.status = 'Loading...';
            let element = document.querySelector('.instagram-post .post-content');
            let distance = element.clientHeight;

            let scale = 3;
            let options = {
                height: distance * scale,
                width: distance * scale,
                style: {
                    'transform': 'scale(' + 3 + ')',
                    'transform-origin': 'top left'
                }
            }

            domtoimage.toJpeg(element, options)
            .then(result => {
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = result;
                link.download = 'post.jpeg',
                document.body.appendChild(link);
                link.click();

                link.remove();
                this.status = 'Download';
                element.removeAttribute('style');
            })
        }
    }
})

// Randomize comment count
app.post.comments = Math.round( Math.random() * 10 ) + 1;