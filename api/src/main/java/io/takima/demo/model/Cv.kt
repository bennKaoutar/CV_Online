package io.takima.demo.model

import javax.persistence.*

@Entity(name = "cvs")
data class Cv(
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id var id: Long?,
        @Column(name = "user") var user: String?,
        @Column(name = "education") var education: String?,
        @Column(name = "experience") var experience: String?,
        @Column(name = "skills") var skills: String?,
        @Column(name = "languages") var languages: String?,
        @Column(name = "activities") var activities: String?) {
    constructor() : this(null, null, null, null, null, null, null)
}