const getChannelNames = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await fetch("/api/channels", options);
    if (response.status !== 200) {
        console.log("Error fetching channels");
        return;
    }
    const data = await response.json();
    console.log("Response: ", data);
    return data;
};

export { getChannelNames };