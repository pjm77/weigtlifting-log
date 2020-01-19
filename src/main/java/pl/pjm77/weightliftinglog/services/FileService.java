package pl.pjm77.weightliftinglog.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.pjm77.weightliftinglog.models.File;
import pl.pjm77.weightliftinglog.repositories.FileRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
public class FileService {

    private FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public void storeAllFiles(Long workoutId,
                              LinkedList<MultipartFile> workoutFiles) {
        List<File> files = new ArrayList<>();
        workoutFiles.forEach((file) -> {
            try {
                files.add(new File(0L, workoutId, file.getOriginalFilename(),
                        file.getContentType(), file.getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        fileRepository.saveAll(files);
        fileRepository.flush();
    }

    public File findFileByWorkoutIdAndFilename(Long workoutId, String filename) {
        return fileRepository.findFileByWorkoutIdAndFilename(workoutId, filename);
    }

    public void deleteFileByWorkoutIdAndFilename(Long workoutId, String filename) {
        fileRepository.deleteByWorkoutIdAndFilename(workoutId, filename);
    }
}