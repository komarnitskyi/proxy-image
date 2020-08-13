import fetch from "node-fetch";
import FileType from 'file-type';
import isImageUrl from 'is-image-url';

const validation = {
    isURL(value) {
        const reg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
        return reg.test(value);
    },
    isImageUrl(value) {
        return isImageUrl(value)
    }
};

const Proxy = {

    getImage(req, res) {
        const {image} = req.params;

        if (!validation.isImageUrl(image)) {
            return res.json({message: "Invalid image link"});
        }

        fetch(image)
            .then(response => {
                if (response.status !== 200) {
                    return res.status(response.status).send(response.statusText);
                    // or we can use this.
                    // return res.json({message: `Error: Image ${response.statusText}`});
                }
                return response.buffer();
            })
            .then(buffer => {
                FileType.fromBuffer(buffer)
                    .then(type => {
                        // here we can add headers
                        res.set({
                            'x-custom-header': 'test'
                        });
                        res.type(type.mime);
                        return res.send(buffer);
                    })
                    .catch(error => {
                        return res.json({message: "Invalid image type"})
                    })
            })
            .catch(error => {
                return res.json({message: error})
            });
    }
};

export default Proxy;
