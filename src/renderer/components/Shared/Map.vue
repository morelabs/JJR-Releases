<template>
  <div
    v-loading="loading"
    class="map-wrapper">
    <div
      id="map"
      style="height: 40em; width: 100%"></div>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    points: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      map: null,
      mapConfig: {
        zoom: 16,
        disableDefaultUI: true,
        draggable: true,
        zoomControl: true,
        scaleControl: true,
        center: { lat: -34.4686234, lng: -58.5181671 },
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#ebe3cd"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#523735"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#f5f1e6"
              }
            ]
          },
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#c9b2a6"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#dcd2be"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#ae9e90"
              }
            ]
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "poi",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#93817c"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#a5b076"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#447530"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                color: "#f5f1e6"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#fdfcf8"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#f8c967"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#e9bc62"
              }
            ]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [
              {
                color: "#e98d58"
              }
            ]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#db8555"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#806b63"
              }
            ]
          },
          {
            featureType: "transit",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#8f7d77"
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ebe3cd"
              }
            ]
          },
          {
            featureType: "transit.station",
            elementType: "geometry",
            stylers: [
              {
                color: "#dfd2ae"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#b9d3c2"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#92998d"
              }
            ]
          }
        ]
      }
    };
  },
  created() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.map = new window.google.maps.Map(
          document.getElementById("map"),
          this.mapConfig
        );
        this.addPoints();
      }, 3000);
    },
    addPoints() {
      console.log("Add pointed passed as props");
    }
  }
};
</script>
