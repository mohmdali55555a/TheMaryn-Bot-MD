```java
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoGetYouTubeResponse;

import java.io.FileOutputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;

public class YouTubeDownloadVideo {

    private static final String YOUTUBE_API_KEY = "YOUR_API_KEY";

    public static void main(String[] args) throws GeneralSecurityException, IOException {

        // Get the video ID from the command line
        if (args.length < 1) {
            System.out.println("Usage: YouTubeDownloadVideo <video-id>");
            return;
        }
        String videoId = args[0];

        // Build a YouTube object
        YouTube youtube = new YouTube.Builder(GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance())
                .setApplicationName("YouTube Video Downloader")
                .build();

        // Get the video
        try {
            VideoGetYouTubeResponse videoResponse = youtube.videos().get("snippet", videoId)
                    .execute();
            Video video = videoResponse.getItems().get(0);

            // Get the video title
            String videoTitle = video.getSnippet().getTitle();

            // Create a file for the video
            FileOutputStream fileOutputStream = new FileOutputStream(videoTitle + ".mp4");

            // Download the video
            youtube.videos().get("contentDetails", videoId).executeMediaAndDownloadTo(fileOutputStream);

            System.out.println("Video downloaded successfully.");
        } catch (GoogleJsonResponseException e) {
            System.err.println("YouTube error: " + e.getDetails().getCode() + " - " + e.getDetails().getMessage());
        }
    }
}
```
