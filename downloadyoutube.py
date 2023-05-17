from pytube import YouTube
from moviepy.editor import *

# video_url = "https://www.youtube.com/watch?v=yLYpNqafL6I" # david bowie
# video_url = "https://www.youtube.com/watch?v=VHslS0QPMSc" # chamath twist
video_url = "https://www.youtube.com/watch?v=x8PfxbN1_TE"

# Download the video
x = YouTube(video_url).streams.first().download()

video_file = VideoFileClip(x)
audio_file = video_file.audio
audio_file.write_audiofile("audio.mp3")
