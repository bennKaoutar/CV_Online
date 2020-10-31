package io.takima.demo.model

import java.sql.Blob
import javax.persistence.*

@Entity(name = "cvs")
data class Cv(
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var id: Long?,
        @Column(name="image") var image: String?,
        @Column(name = "user") var user: String?,
        @Column(name = "education") var education: String?,
        @Column(name = "experience") var experience: String?,
        @Column(name = "skills") var skills: String?,
        @Column(name = "languages") var languages: String?,
        @Column(name = "activities") var activities: String?,
        @Column(name= "git") var git:String?,
        @Column(name= "linkedin") var linkedin:String?,
        @Column(name= "fb") var fb:String?)
{
    constructor() : this(null, null, null, null, null, null, null, null,null,null,null)
}