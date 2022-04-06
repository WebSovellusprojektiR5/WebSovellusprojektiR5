package com.websovellusprojektiR5.R5_RestAPI.Services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageService {


    public String UploadImage(MultipartFile mFile) {
        String imageURL = "";

        try {
            Cloudinary cl = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", "oamk-oulu",
                    "api_key", "131375434275747",
                    "api_secret", "b4ojgkC8riCOor2glxjNvcayUD0",
                    "secure", true
            ));

            Map map = cl.uploader().upload(mFile.getBytes(), ObjectUtils.emptyMap());
            imageURL = (String)map.get("url");
        }
        catch (IOException e) { imageURL = ""; }

        return imageURL;
    }
}
