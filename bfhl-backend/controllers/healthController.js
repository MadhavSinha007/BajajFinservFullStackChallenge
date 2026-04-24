exports.ping = (req, res) => {
    return res.status(200).json({
        status: "UP",
        message: "Server is still running\n",
        timestamp: new Date().toISOString()
    });
};