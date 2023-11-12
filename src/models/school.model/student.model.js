module.exports = (db, type) => {
    return db.define('student', {
        student_Id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        class_Id: {
            type: type.INTEGER,
            
        },
        gender_Id: {
            type: type.INTEGER,
            allowNull: false,
        },
        religion_Id: {
            type: type.INTEGER,
            allowNull: false,
        },
        grade_Id: {
            type: type.INTEGER,
            allowNull: false,
        },
    }
    )
}