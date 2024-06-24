export const presentations = {
  presentations: [
    {
      id: 'presentation1',
      title: 'Sunday Service',
      slides: [
        {
          id: 'slide1',
          type: 'text', // or "image", "video", etc.
          content: 'Welcome to the Sunday Service',
          background: '#ffffff',
          transitions: {
            type: 'fade',
            duration: 500
          }
        },
        {
          id: 'slide2',
          type: 'image',
          content: 'path/to/image.jpg',
          background: '#000000',
          transitions: {
            type: 'slide',
            duration: 700
          }
        }
      ]
    }
  ]
}
