// fetch("https://notable-rodent-11753-eu1-rest-kafka.upstash.io/produce/project_t/adiel", {
//   headers: {
//     Authorization: "Basic Ym05MFlXSnNaUzF5YjJSbGJuUXRNVEUzTlRNa1FfYWIxTHNETG1CSElWalg2MmU4TGZTMVlKQUNJUGNFX2tNOjQwNzk1MTM4MmZhZDRhZjFhNWY3NzA1MjJmMzVmMzZl"
//   }
// }).then(response => response.json())
//   .then(data => {
//     console.log(data)
//   });

user_name = 'bm90YWJsZS1yb2RlbnQtMTE3NTMkQ_ab1LsDLmBHIVjX62e8LfS1YJACIPcE_kM'
pw = '407951382fad4af1a5f770522f35f36e'

fetch("http://localhost:3000/generate-data")
    .then(response => response.json())
    .then(data => {
        fetch("https://notable-rodent-11753-eu1-rest-kafka.upstash.io/produce/project_t/" + JSON.stringify(data), {
            headers: {
                Authorization: "Basic Ym05MFlXSnNaUzF5YjJSbGJuUXRNVEUzTlRNa1FfYWIxTHNETG1CSElWalg2MmU4TGZTMVlKQUNJUGNFX2tNOjQwNzk1MTM4MmZhZDRhZjFhNWY3NzA1MjJmMzVmMzZl"
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
            });
        // Handle the retrieved data here
    })
    .catch(error => {
        console.error("Error:", error);
        // Handle any errors that occurred during the request
    });



fetch("https://notable-rodent-11753-eu1-rest-kafka.upstash.io/consume/liverpool/GROUP_INSTANCE_NAME/project_t", {
    headers: {
        Authorization: "Basic Ym05MFlXSnNaUzF5YjJSbGJuUXRNVEUzTlRNa1FfYWIxTHNETG1CSElWalg2MmU4TGZTMVlKQUNJUGNFX2tNOjQwNzk1MTM4MmZhZDRhZjFhNWY3NzA1MjJmMzVmMzZl"
    }
}).then(response => response.json())
    .then(data => {
        console.log(data);
    });